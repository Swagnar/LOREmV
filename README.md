# 🚧 LOREmV 🚧

A TTRPG journal for me and my friends.

Made using React and Express. TypeScript is one hell of a drug.
The backend recurrently scans the contents of the `campaigns` folder, and serves them to the React app. The app supports multiple TTRPG campaigns.


## Usage

### Directory Tree

Do you like Markdown? I hope so, because it's the backbone of this app. For each campaign create a folder inside `backend/campaigns` like so:
```
/campaigns
  |- DND/
  |    |- Locations/
  |    |     |- MainTown.md
  |    |     |- Camp.md
  |    |- NPCs/
  |    |     |- Mayor.md
  |    |     |- King.md
  |  
  |- Call of Cthulhu/
       |- Locations/
       |     |- CreepyManor.md
       |     |- Library.md
       |- NPCs/
       |     |- The Old One.md
       |     |- The New One.md
```

### Images

Do you want to include images in your Markdown files? Okay! But I have one condition. Here's how you need to do it:
```md
![](/public/yourimage.png)
```
Express serves the `/public` directory and returns to the React app changed URLs. To be more precise:
```ts
content = content.replace(/!\[\]\((\/public\/[^)]+)\)/g, (match, p1) => {
  return `![](${API_URL}${p1})`
});
```
Have fun!

---

### Demo

Currently I'm working on deploying the app, but cPanel ain't so straightforward. Soon you could use one of the following:

- [api.euklidesowo.pl](https://api.euklidesowo.pl) - backend of the app. I'm joking, you can't use it, it has strict CORS policy.
- [lorem.euklidesowo.pl](https://lorem.euklidesowo.pl) - frontend of the app and main entry point.

### Installation

Run `npm i` in each directory - `frontend` and `backend`, then run both servers with `npm start`



