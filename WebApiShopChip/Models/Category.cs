using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Chip.Models
{
    public class Category
    {
        [Required]
        [Key]
        public int CategoryId { get; set; }

        [Required]
        public string Category_title { get; set; }

        [Required]
        public string Image { get; set; }
    }
}