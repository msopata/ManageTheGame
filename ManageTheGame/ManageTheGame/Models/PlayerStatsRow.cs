using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ManageTheGame.Models
{
    public class PlayerStatsRow
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Games { get; set; }
        public int MVP { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int YellowCards { get; set; }
        public int RedCards { get; set; }
    }
}
