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

        public CompetitionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Competition> Get()
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
