using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Web;

namespace Chip.Models
{
    public class OrderDetail
    {
        [Required]
        [Key]
        public int OrderDetailId { get; set; }

        [Required]
        public string ProductTitle { get; set; }

        [Required]   
        public string ProductDescription { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal ProductPrice { get; set; }

        [Required]
        public string ProductUnits { get; set; }

        [Required]
        public int ProductCount { get; set; }

        public int OrderOrderId { get; set; }

        [Required]
        public virtual Order Order { get; set; }
    }
}