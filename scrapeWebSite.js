import puppeteer from "puppeteer";

export default async function scrapeWebsite() {
    const browser = await puppeteer.launch({headless:'new'}); 
    const page = await browser.newPage();
    // Navigate to a website
    await page.goto('https://www.example.com');
    // Find and click on the first link 
    const firstLink = await page.$('a'); 
    firstLink.click();
    console.log('click')
   
    // Wait for some content to load
    await page.waitForSelector('article');

    // Extract data
    const data = await page.evaluate(()=>{
        const title = document.querySelector('h1').innerText;
        const articleBody = [... document.querySelectorAll('p')].map(paragraph => {
            return paragraph.innerText
        });
         return {
            title,
            articleBody
        }
    });
   
    // Print the results
    console.log(data)
    
    // Close the browser
    await browser.close(); 
   
}
