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
