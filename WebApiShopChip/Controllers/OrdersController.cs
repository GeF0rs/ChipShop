using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Chip.Models;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace WebApiShopChip.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ChipContext _context;

        public OrdersController(ChipContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<string> GetOrders()
        {
            var result = await _context.Orders
                .Where(o => o.Client.Email == User.Identity.Name)
                .Include(o => o.OrderDetails).ToListAsync();

            DefaultContractResolver contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };

            var json = JsonConvert.SerializeObject(result, Formatting.Indented,
                    new JsonSerializerSettings()
                    {
                        ContractResolver = contractResolver,
                        ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                    });

            return json;
        }

        // GET: api/Orders/5
        [Authorize(Roles = "admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost("ToPay")]
        public async Task<IActionResult> ToPay(int id)
        {
            Order order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == id && o.Client.Email == User.Identity.Name);
            if (order == null)
            {
                return NotFound(new { errorText = "Order not found" });
            }

            if (order.PaymentDate != default)
            {
                return BadRequest(new { errorText = "Order has already been paid" });
            }

            order.PaymentDate = DateTime.Now;
            await _context.SaveChangesAsync();

            var response = new
            {
                paymentDate = order.PaymentDate.ToString()
            };

            return new JsonResult(response);
        }

        // POST: api/Orders
        [HttpPost]
        public async Task<IActionResult> PostOrder(ICollection<Models.OrderCreateModel> order)
        {
            if (order == null)
            {
                return BadRequest(new { errorText = "Payload invalid" });
            }

            Client client = await _context.Clients.FirstOrDefaultAsync(u => u.Email == User.Identity.Name);

            if (client == null)
            {
                return NotFound(new { errorText = "User not found" });
            }

            Order orderNew = new Order
            {
                Client = client,
                DateDoc = DateTime.Now
            };

            _context.Orders.Add(orderNew);

            foreach (var orderItem in order)
            {
                OrderDetail orderDetail = new OrderDetail
                {
                    Order = orderNew,
                    ProductTitle = orderItem.ProductTitle,
                    ProductDescription = orderItem.ProductDescription,
                    ProductPrice = orderItem.ProductPrice,
                    ProductCount = orderItem.ProductCount,
                    ProductUnits = orderItem.ProductUnits
                };

                _context.OrderDetails.Add(orderDetail);
                    
            }

            await _context.SaveChangesAsync();
            return StatusCode(201);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == id && o.Client.Email == User.Identity.Name);
            if (order == null)
            {
                return NotFound(new { errorText = "Order not found" });
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
    }
}
