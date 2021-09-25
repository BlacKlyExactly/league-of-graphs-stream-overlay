import puppeteer from "puppeteer";

const URL = "https://www.leagueofgraphs.com/en/summoner/champions"

const scrape = async ( params: { server: string, summoner: string, champion: string }) => {
    const browser = await puppeteer.launch({ headless: true, args: [ "--no-sandbox" ] });

    try {
        const page = await browser.newPage();
    
        await page.goto(`${URL}/${params.server}/${params.summoner}`, {
            timeout: 100000,
            waitUntil: "networkidle2"
        });
    
        const data = await page.evaluate(( champion, server, params )  => {
            //@ts-expect-error
            const trimContent = ( str ) => 
                str.replace(/\n/g, "").replace(" ", "").trim();
    
            const champ =
                Array.from(document.querySelectorAll("tr .name"))
                    .find(el => el.innerHTML.trim() === champion)
                    ?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
                    
            if(!champ) return {}
            
            const rank = (champ.querySelector("strong")?.innerHTML || "-").replace(',', ".");
    
            const regionalRank = trimContent(champ.querySelector(".regionalRank")?.innerHTML || "-")
                .replace("(", "")
                .replace(")", "")
                .replace(`${server.toUpperCase()}:`, "")
                .replace(',', ".");
    
            const games = champ.querySelectorAll(".progressBarTxt")[0]?.innerHTML;
            const winRatio = champ.querySelectorAll(".progressBarTxt")[1]?.innerHTML;
            const maestryImg = champ.querySelector(".championMasteryLevelIcon")?.getAttribute("src");
            const pentakills = trimContent(champ.children[6].querySelector("a")?.innerHTML);
            const goldPerMinute = trimContent(champ.children[5].querySelector("a")?.innerHTML);
            const minionsPerMinute = trimContent(champ.children[4].querySelector("a")?.innerHTML);
            const championIcon = `http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${champion}.png`;
    
            const kda = {
                kills: champ.querySelector(".kills")?.innerHTML,
                deaths: champ.querySelector(".deaths")?.innerHTML,
                assists: champ.querySelector(".assists")?.innerHTML,
            }
            
            return {
                rank,
                regionalRank,
                kda,
                games,
                winRatio,
                pentakills,
                goldPerMinute,
                minionsPerMinute,
                maestryImg: `https:${maestryImg}`,
                championIcon,
                userData: params
            }
        }, params.champion, params.server, params)

        await browser.close();
        return data
    } catch (error){
        console.error(error);
    } finally{
        await browser.close();
    }
}

export default scrape;