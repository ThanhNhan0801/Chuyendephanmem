using Microsoft.AspNetCore.Mvc;
using PhotoManagementAPI.Models;
using PhotoManagementAPI.Services;

namespace PhotoManagementAPI.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class PhotosController : ControllerBase
{
    private readonly List<Photo> _photos = new List<Photo>();

    // POST api/photos
    [HttpPost]
    public IActionResult Post([FromBody] Photo photo)
    {
        if (photo == null || !ModelState.IsValid)
        {
            return BadRequest("Invalid photo data.");
        }

        // Add photo to the list (or database)
        _photos.Add(photo);

        return Ok(photo);
    }

    // GET api/photos
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_photos);
    }

    // DELETE api/photos/{id}
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var photo = _photos.FirstOrDefault(p => p.Id == id);
        if (photo == null)
        {
            return NotFound();
        }

        _photos.Remove(photo);
        return NoContent();
    }
}
