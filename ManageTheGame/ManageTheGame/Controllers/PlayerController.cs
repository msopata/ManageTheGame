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
    public class PlayerController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public PlayerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Player> Get()
        {
            return _context.Players.ToList();
        }

        [HttpPost("[action]/{ClubId}")]
        public async Task<IActionResult> Add(Guid ClubId, [FromForm] string values)
        {
            var player = JsonConvert.DeserializeObject<Player>(values);

            if (player == null)
                return BadRequest();

            player.Id = Guid.NewGuid();
            player.ClubId = ClubId;
            await _context.Players.AddAsync(player);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("[action]")]
        public IActionResult Update([FromForm] string values)
        {
            var player = JsonConvert.DeserializeObject<Player>(values);
            var existingPlayer = _context.Players.Where(x => x.Id == player.Id)
                                                    .FirstOrDefault<Player>();

            if (existingPlayer == null)
                return NotFound();

            existingPlayer.FirstName = player.FirstName;
            existingPlayer.LastName = player.LastName;
            existingPlayer.Birth = player.Birth;
            existingPlayer.Number = player.Number;
            existingPlayer.Nationality = player.Nationality;
            existingPlayer.Height = player.Height;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("[action]")]
        public IActionResult Delete([FromForm] Guid key)
        {
            var player = _context.Players.Where(x => x.Id == key)
                                                    .FirstOrDefault<Player>();
            if (player == null)
                return NotFound();
            _context.Remove(player);
            _context.SaveChanges();
            return Ok();
        }
    }
}
