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
    public class ClubController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public ClubController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Club> Get()
        {
            return _context.Clubs.ToList();
        }

        [HttpGet("[action]/{Id}")]
        public Club GetClubDetails(Guid Id)
        {
            return _context.Clubs.Where(x => x.Id == Id).FirstOrDefault<Club>();
        }

        [HttpGet("[action]/{Id}")]
        public IEnumerable<Fixture> GetFixtures(Guid Id)
        {
            var fixtures = _context.Fixtures.Where(x => x.HomeId == Id || x.AwayId == Id).OrderByDescending(x => x.Date).ToList();
            foreach (var fixture in fixtures)
            {
                var home = _context.Clubs.Where(x => x.Id == fixture.HomeId).FirstOrDefault();
                var away = _context.Clubs.Where(x => x.Id == fixture.AwayId).FirstOrDefault();
                var competition = _context.Competitions.Where(x => x.Id == fixture.CompetitionId).FirstOrDefault();

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

                fixture.Competition = new Competition
                {
                    Name = competition.Name
                };
            }
            return fixtures;
        }



        [HttpGet("[action]/{Id}")]
        public IEnumerable<Player> GetPlayers(Guid Id)
        {
            return _context.Players.Where(x => x.ClubId == Id).ToList();
        }

        [HttpGet("[action]/{Id}")]
        public IEnumerable<PlayerStatsRow> GetStats(Guid Id)
        {
            var players = GetPlayers(Id);
            var playerStatsList = new List<PlayerStatsRow>();
            foreach( var player in players)
            {
                var stats = _context.Stats.Where(x => x.PlayerId == player.Id).ToList();
                var playerStat = new PlayerStatsRow { 
                    FirstName = player.FirstName,
                    LastName = player.LastName,
                    Games = stats.Count,
                    Goals = 0,
                    Assists = 0,
                    MVP = 0,
                    YellowCards = 0,
                    RedCards = 0
                };
                foreach(var stat in stats)
                    switch (stat.Type)
                    {
                        case 1:
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
                            playerStat.RedCards++;
                            break;
                        default:
                            break;
                    }   

                playerStatsList.Add(playerStat);
            }
            return playerStatsList;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Add([FromForm] string values)
        {
            var club = JsonConvert.DeserializeObject<Club>(values);

            if (club == null)
                return BadRequest();

            club.Id = Guid.NewGuid();
            await _context.Clubs.AddAsync(club);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("[action]")]
        public IActionResult Update([FromForm] string values)
        {
            var club = JsonConvert.DeserializeObject<Club>(values);
            var existingClub = _context.Clubs.Where(x => x.Id == club.Id)
                                                    .FirstOrDefault<Club>();

            if (existingClub == null)
                return NotFound();

            existingClub.Name = club.Name;
            existingClub.Abbreviation = club.Abbreviation;
            existingClub.Founded = club.Founded;
            existingClub.Description = club.Description;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("[action]")]
        public IActionResult Delete([FromForm] Guid key)
        {
            var club = _context.Clubs.Where(x => x.Id == key)
                                                    .FirstOrDefault<Club>();
            if (club == null)
                return NotFound();
            _context.Remove(club);
            _context.SaveChanges();
            return Ok();
        }
    }
}
