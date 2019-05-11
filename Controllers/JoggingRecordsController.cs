using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace mvc_classic_angular
{
    public class JoggingRecord
    {
        public int Id { get; set; }

        public float Distance { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }
    }


    public class JoggingRecordsController : ApiController
    {
        List<JoggingRecord> JoggingRecords = new List<JoggingRecord>() {
              new JoggingRecord { Id = 1, Description = "Friday Evening #1", Distance = 105.5f, CreatedAt = new DateTime(2018, 5, 1) },
    new JoggingRecord { Id = 2, Description = "Saturday morning", Distance = 6.15f, CreatedAt = new DateTime(2018, 4, 4) },
    new JoggingRecord { Id = 3, Description = "Marathon", Distance = 20, CreatedAt = new DateTime(2018, 5, 13) },
    new JoggingRecord { Id = 4, Description = "Short one", Distance = 3.5f, CreatedAt = new DateTime(2018, 6, 6) }
        };

        // GET: api/JoggingRecords
        public IQueryable<JoggingRecord> GetJoggingRecords() => JoggingRecords.AsQueryable();

        // GET: api/JoggingRecords/5
        [ResponseType(typeof(JoggingRecord))]
        public IHttpActionResult GetJoggingRecord(int id)
        {
            JoggingRecord joggingRecord = JoggingRecords.FirstOrDefault(j => j.Id == id);
            if (joggingRecord == null)
            {
                return NotFound();
            }

            return Ok(joggingRecord);
        }
    }
}