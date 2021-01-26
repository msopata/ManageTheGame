using ManageTheGame.Data;
using ManageTheGame.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompetitionController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly ClubController _clubController;
        private readonly CompetitionClubController _competitionClubController;
        private readonly FixtureController _fixtureController;

        public CompetitionController(ApplicationDbContext context)
        {
            _context = context;
            _clubController = new ClubController(context);
            _competitionClubController = new CompetitionClubController(context);
            _fixtureController = new FixtureController(context);
        }

        
        [HttpGet("[action]")]
        public IEnumerable<Competition> Get()
        {
            return _context.Competitions.ToList();
 
        }

        [HttpGet("[action]/{id}")]
        public Competition GetCompetitionDetails(Guid Id)
        {
            var competition = _context.Competitions.Where(x => x.Id == Id)
                                                    .FirstOrDefault<Competition>();
            competition.Clubs = new List<Club>();
            var clubs = _competitionClubController.GetClubs(competition.Id);
            foreach (var club in clubs)
            {
                var clubDetails = _clubController.GetClubDetails(club.ClubId);
                competition.Clubs.Add(clubDetails);
            }
            return competition;
        }

        [HttpGet("[action]")]
        public IEnumerable<Competition> GetClubs()
        {
            return _context.Competitions.ToList();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Add([FromForm] string values)
        {
            var competition = JsonConvert.DeserializeObject<Competition>(values);

            if (competition == null)
                return BadRequest();

            competition.Id = Guid.NewGuid();
            await _context.Competitions.AddAsync(competition);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("[action]")]
        public IActionResult Update([FromForm] string values)
        {
            var competition = JsonConvert.DeserializeObject<Competition>(values);
            var existingCompetition = _context.Competitions.Where(x=> x.Id == competition.Id)
                                                    .FirstOrDefault<Competition>();

            if (existingCompetition == null)
                return NotFound();

            existingCompetition.Name = competition.Name;
            existingCompetition.DateFrom = competition.DateFrom;
            existingCompetition.DateTo = competition.DateTo;
            existingCompetition.Description = competition.Description;
            existingCompetition.Type = competition.Type;
            existingCompetition.TeamCount = competition.TeamCount;
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("[action]/{Id}")]
        public IEnumerable<PlayerStatsRow> GetCompetitionStats(Guid Id)
        {
            var clubs = _context.CompetitionClubs.Where(x => x.CompetitionId == Id);
            var players = new List<Player>();
            foreach(var club in clubs)
            {
                var clubPlayers = _context.Players.Where(x => x.ClubId == club.ClubId);
                foreach(var player in clubPlayers)
                {
                    var clubName = _context.Clubs.Where(x => x.Id == club.ClubId).First().Name;
                    player.Club = new Club { 
                        Name = clubName
                    };
                    players.Add(player);
                }
                    
            }
            
            var playerStatsList = new List<PlayerStatsRow>();
            foreach (var player in players)
            {
                var stats = _context.Stats.Where(x => x.PlayerId == player.Id).ToList();
                var playerStat = new PlayerStatsRow
                {
                    FirstName = player.FirstName,
                    LastName = player.LastName,
                    ClubName = player.Club.Name, 
                    Games = 0,
                    Goals = 0,
                    Assists = 0,
                    MVP = 0,
                    YellowCards = 0,
                    RedCards = 0
                };
                foreach (var stat in stats)
                    switch (stat.Type)
                    {
                        case 1:
                            playerStat.Games++;
                            break;
                        case 2:
                            playerStat.Goals++;
                            break;
                        case 3:
                            playerStat.Assists++;
                            break;
                        case 4:
                            playerStat.YellowCards++;
                            break;
                        case 5:
                            playerStat.RedCards++;
                            break;
                        case 6:
                            playerStat.MVP++;
                            break;
                        default:
                            break;
                    }

                playerStatsList.Add(playerStat);
            }
            return playerStatsList.OrderByDescending(x => x.Goals).ThenBy(x => x.Assists);
        }

        [HttpPut("[action]/{id}")]
        public async Task<IActionResult> UpdateCompetitionStart(Guid id)
        {
            var competition = GetCompetitionDetails(id);

            if (competition == null)
                return NotFound();

            await _fixtureController.CreateCompetitionFixtures(competition);

            competition.Started = true;
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("[action]")]
        public IActionResult Delete([FromForm] Guid key)
        {
            var existingCompetition = _context.Competitions.Where(x => x.Id == key)
                                                    .FirstOrDefault<Competition>();

            if (existingCompetition == null)
                return NotFound();

            _context.Remove(existingCompetition);
            _context.SaveChanges();
            return Ok();
        }
    }
}
