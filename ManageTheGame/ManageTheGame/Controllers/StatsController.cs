﻿using ManageTheGame.Data;
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
    public class StatsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public StatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<Stat> Get()
        {
            return _context.Stats.ToList();
        }

        [HttpGet("[action]/{fixtureId}")]
        public IEnumerable<Stat> GetFixtureStats(Guid fixtureId)
        {
            return _context.Stats.Where(x => x.FixtureId == fixtureId).ToArray();
        }

        [HttpPost("[action]/")]
        public async Task<IActionResult> Add([FromForm] string values)
        {
            var stat = JsonConvert.DeserializeObject<Stat>(values);

            if (stat == null)
                return BadRequest();

            stat.Id = Guid.NewGuid();
            await _context.Stats.AddAsync(stat);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("[action]")]
        public IActionResult Update([FromForm] string values)
        {
            var stat = JsonConvert.DeserializeObject<Stat>(values);
            var existingStat = _context.Stats.Where(x => x.Id == stat.Id)
                                                    .FirstOrDefault<Stat>();

            if (existingStat == null)
                return NotFound();

            existingStat.Type = stat.Type;
            existingStat.Minute = stat.Minute;
            existingStat.FixtureId = stat.FixtureId;
            existingStat.PlayerId = stat.PlayerId;
            _context.SaveChanges();
            return Ok();
        }

        [HttpDelete("[action]")]
        public IActionResult Delete([FromForm] Guid key)
        {
            var stat = _context.Stats.Where(x => x.Id == key)
                                                    .FirstOrDefault<Stat>();
            if (stat == null)
                return NotFound();
            _context.Remove(stat);
            _context.SaveChanges();
            return Ok();
        }
    }
}
