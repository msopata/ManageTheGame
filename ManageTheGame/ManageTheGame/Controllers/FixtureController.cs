using ManageTheGame.Data;
using ManageTheGame.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FixtureController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public FixtureController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Fixture> Get()
        {
            return _context.Fixtures.ToList();
        }

        [HttpGet("[action]/{id}")]
        public IEnumerable<Fixture> GetCompetitionFixtures(Guid id)
        {

            var fixtures = _context.Fixtures.Where(x => x.CompetitionId == id).OrderBy(x => x.Gameweek);

            foreach( var fixture in fixtures)
            {
                var home = _context.Clubs.Where(x => x.Id == fixture.HomeId).FirstOrDefault();
                var away = _context.Clubs.Where(x => x.Id == fixture.AwayId).FirstOrDefault();

                fixture.Home = new Club
                {
                    Name = home.Name,
                    Abbreviation = home.Abbreviation
                };

                fixture.Away = new Club
                {
                    Name = away.Name,
                    Abbreviation = away.Abbreviation
                };
            }

            return fixtures.ToList();
        }

        [HttpGet("[action]/{competitionId}")]
        public IEnumerable<StandingsRow> GetStandings(Guid competitionId)
        {
            var standings = new List<StandingsRow>();
            var fixtures = _context.Fixtures.Where(x => x.CompetitionId == competitionId);
            var clubs = _context.CompetitionClubs.Where(x => x.CompetitionId == competitionId);

            foreach( var club in clubs)
            {
                var name = _context.Clubs.Where(x => x.Id == club.ClubId).First().Name;
                var row = new StandingsRow { Games = 0, GoalsConceded = 0, GoalsScored = 0, Points = 0, ClubName = name };
                foreach( var fixture in fixtures.Where(x => (x.HomeId == club.ClubId || x.AwayId == club.ClubId) && x.Date > new DateTime(2000, 1, 1) ))
                {
                    row.Games++;
                    if (fixture.HomeId == club.ClubId)
                    {                        
                        if (fixture.HomeGoals > fixture.AwayGoals)
                            row.Points += 3;
                        else if (fixture.HomeGoals == fixture.AwayGoals)
                            row.Points++;
                        row.GoalsScored += fixture.HomeGoals;
                        row.GoalsConceded += fixture.AwayGoals;
                    }

                    if (fixture.AwayId == club.ClubId)
                    {
                        if (fixture.HomeGoals < fixture.AwayGoals)
                            row.Points += 3;
                        else if (fixture.HomeGoals == fixture.AwayGoals)
                            row.Points++;
                        row.GoalsScored += fixture.AwayGoals;
                        row.GoalsConceded += fixture.HomeGoals;
                    }
                }
                standings.Add(row);
            }
            return standings.OrderByDescending(x => x.Points).ThenByDescending(x => x.GoalsScored - x.GoalsConceded).ThenBy(x => x.Games);
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Add([FromForm] string values)
        {
            var fixture = JsonConvert.DeserializeObject<Fixture>(values);

            if (fixture == null)
                return BadRequest();

            fixture.Id = Guid.NewGuid();
            await _context.Fixtures.AddAsync(fixture);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("[action]")]
        public IActionResult Update([FromForm] string values)
        {
            var fixture = JsonConvert.DeserializeObject<Fixture>(values);
            var existingFixture = _context.Fixtures.Where(x => x.Id == fixture.Id)
                                                    .FirstOrDefault<Fixture>();

            if (existingFixture == null)
                return NotFound();

            existingFixture.Date = fixture.Date;
            existingFixture.Gameweek = fixture.Gameweek;
            existingFixture.HomeGoals = fixture.HomeGoals;
            existingFixture.AwayGoals = fixture.AwayGoals;
            existingFixture.HomeId = fixture.HomeId;
            existingFixture.AwayId = fixture.AwayId;
            existingFixture.Duration = fixture.Duration;
            existingFixture.CompetitionId = fixture.CompetitionId;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("[action]")]
        public IActionResult Delete([FromForm] Guid key)
        {
            var fixture = _context.Fixtures.Where(x => x.Id == key)
                                                    .FirstOrDefault<Fixture>();
            if (fixture == null)
                return NotFound();
            _context.Remove(fixture);
            _context.SaveChanges();
            return Ok();
        }

        //Function responsible for creating list of fixtures based on competition list teams with RoundRobin algorithm
        public async Task<IActionResult> CreateCompetitionFixtures(Competition competition)
        {

            int[,] arr = new int[competition.TeamCount, competition.TeamCount];

            if (competition.TeamCount % 2 == 0)
                arr = GenerateRoundRobinEven(competition.TeamCount);
            else
                arr = GenerateRoundRobinOdd(competition.TeamCount);

            for (int j = 0; j < arr.GetLength(0); j++)
                for (int i = 0; i < arr.GetLength(1); i++)
                {
                    var fixture = new Fixture
                    {
                        HomeId = competition.Clubs[j].Id,
                        AwayId = competition.Clubs[arr[j, i]].Id,
                        Gameweek = i,
                        CompetitionId = competition.Id
                    };

                    bool exists = _context.Fixtures.Any(x => x.CompetitionId == competition.Id &&
                                                        x.Gameweek == fixture.Gameweek &&
                                                        (x.AwayId == fixture.HomeId || x.HomeId == fixture.AwayId));
                    if (exists)
                        continue;

                    fixture.Id = Guid.NewGuid();
                    await _context.Fixtures.AddAsync(fixture);
                    await _context.SaveChangesAsync();
                }

            return Ok();
        }

        public int[,] GenerateRoundRobinOdd(int num_teams)
        {
            int n2 = (int)((num_teams - 1) / 2);
            int[,] results = new int[num_teams, num_teams];

            // Initialize the list of teams.
            int[] teams = new int[num_teams];
            for (int i = 0; i < num_teams; i++) teams[i] = i;

            // Start the rounds.
            for (int round = 0; round < num_teams; round++)
            {
                for (int i = 0; i < n2; i++)
                {
                    int team1 = teams[n2 - i];
                    int team2 = teams[n2 + i + 1];
                    results[team1, round] = team2;
                    results[team2, round] = team1;
                }

                // Set the team with the bye.
                results[teams[0], round] = -1;

                // Rotate the array.
                RotateArray(teams);
            }

            return results;
        }

        public int[,] GenerateRoundRobinEven(int num_teams)
        {
            // Generate the result for one fewer teams.
            int[,] results = GenerateRoundRobinOdd(num_teams - 1);

            // Copy the results into a bigger array,
            // replacing the byes with the extra team.
            int[,] results2 = new int[num_teams, num_teams - 1];
            for (int team = 0; team < num_teams - 1; team++)
            {
                for (int round = 0; round < num_teams - 1; round++)
                {
                    if (results[team, round] == -1)
                    {
                        // Change the bye to the new team.
                        results2[team, round] = num_teams - 1;
                        results2[num_teams - 1, round] = team;
                    }
                    else
                    {
                        results2[team, round] = results[team, round];
                    }
                }
            }

            return results2;
        }

        public void RotateArray(int[] teams)
        {
            int tmp = teams[teams.Length - 1];
            Array.Copy(teams, 0, teams, 1, teams.Length - 1);
            teams[0] = tmp;
        }
    }
}
