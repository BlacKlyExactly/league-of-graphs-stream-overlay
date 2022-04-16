# <a href="https://www.leagueofgraphs.com/pl/">League of Graphs</a> <br/>Stream overlay

<img src="https://i.imgur.com/Wq5St8P.png" style="border-radius: 25px; width: 50%">

---

## Description

League of Graphs Stream overlay is api made for streamers to show stats of champion u play/want to show. Data is taken from www.leagueofgraphs.com. I don't recommend using this code by yourself because it's aginst leagueofgraphs 
<a href="https://www.leagueofgraphs.com/pl/terms-of-use">Terms Of Use</a>

### Made with:
- Puppeteer - Web scrape
- Express - backend
- Socket-io - Overlay data refreshing (data refresh every 10 minutes)
- Typescript

---

## Usage

```
https://leagueofgraphs-stream-overlay.herokuapp.com/champions/overlay/<server>/<summoner>/<champion>
```

### Params:

<b style="font-size: 18px">Server:</b>
- EUNE
- EUW
- NA
- KR
- TR
- BR
- LAN
- LAS
- RU
- OCE
- JP

<b style="font-size: 18px">Summoner:</b> Your nickname from league of legends <br>
<b style="font-size: 18px">Champion:</b> Champion name you want to show in overlay

## Example
```
https://leagueofgraphs-stream-overlay.herokuapp.com/champions/overlay/eune/Gêt Jinxed/Jinx
```
