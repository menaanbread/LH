using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using LanguageHelper.Models;
using System;

namespace LanguageHelper.Controllers
{
    public class PlayController : Controller
    {
        public IActionResult Start(List<WordIdCheck> startModel)
        {
            Console.WriteLine("DEBUGGING -" + startModel.Count);
            return View(startModel);
        }
    }
}