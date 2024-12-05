using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiShopChip.Models
{
    [NotMapped]
    public class OrderCreateModel
    {
        [Required]
        public string ProductTitle { get; set; }

        [Required]
        public string ProductDescription { get; set; }

        [Required]
        public decimal ProductPrice { get; set; }

        [Required]
        public string ProductUnits { get; set; }

        [Required]
        public int ProductCount { get; set; }
    }
}
