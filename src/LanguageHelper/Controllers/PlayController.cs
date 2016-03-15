using Microsoft.AspNet.Mvc;
using System;
using LanguageHelper.ViewModels;
using System.Collections.Generic;

namespace LanguageHelper.Controllers
{
    public class PlayController : Controller
    {
        public IActionResult Start(List<WordIdsViewModel> word)
        {
            Console.WriteLine("DEBUGGING - something first");
            Console.WriteLine("DEBUGGING -" + word.Count);
            return View(word);
        }
    }
}