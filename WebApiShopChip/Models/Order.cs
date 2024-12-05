using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Web;

namespace Chip.Models
{
    public class Order
    {
        [Required]
        [Key]
        public int OrderId { get; set; }

        [ForeignKey("Client_ClientId")]
        [Required]
        public Client Client { get; set; }

        [Required]
        public DateTime DateDoc { get; set; }

        public DateTime? PaymentDate { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

        public Order()
        {
            OrderDetails = new List<OrderDetail>();
        }
    }
}