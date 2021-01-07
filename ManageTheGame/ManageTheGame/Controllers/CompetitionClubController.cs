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
    public class CompetitionClubController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public CompetitionClubController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<CompetitionClub> Get()
        {
            return _context.CompetitionClubs.ToList();
        }

        
        [HttpGet("[action]/{id}")]
        public IEnumerable<CompetitionClub> GetClubs(Guid id)
        {
            return  _context.CompetitionClubs.Where(x => x.CompetitionId == id).ToList();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Add([FromBody] CompetitionClub request)
        {
           // var request = JsonConvert.DeserializeObject<CompetitionClub>(values);

            if (request == null)
                return BadRequest();

            request.Id = Guid.NewGuid();
            await _context.CompetitionClubs.AddAsync(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("[action]")]
        public IActionResult Update([FromForm] string values)
        {
            var competition = JsonConvert.DeserializeObject<CompetitionClub>(values);
            var existingCompetition = _context.CompetitionClubs.Where(x => x.Id == competition.Id)
                                                    .FirstOrDefault<CompetitionClub>();

            if (existingCompetition == null)
                return NotFound();

            existingCompetition.CompetitionId = competition.CompetitionId;
            existingCompetition.ClubId = competition.ClubId;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("[action]")]
        public IActionResult Delete([FromBody] Guid key)
        {
            var existingCompetition = _context.CompetitionClubs.Where(x => x.Id == key)
                                                    .FirstOrDefault<CompetitionClub>();

            if (existingCompetition == null)
                return NotFound();

            _context.Remove(existingCompetition);
            _context.SaveChanges();
            return Ok();
        }
    }
}
