using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Chip.Models
{
    [NotMapped]
    public class LoginModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Pass { get; set; }
    }
}