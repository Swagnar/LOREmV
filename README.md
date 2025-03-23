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
> [!NOTE]
> Tree structure shown here is purely for demonstration. You can have as many campaigns and as many directories inside those campaigns as you like!

### Images

Do you want to include images in your Markdown files? Okay! But I have one condition. Here's how you need to do it:
```md
![](/public/yourimage.png)
```
Your images need to be inside `/backend/public` directory for this to work.
Express serves the `/public` directory and returns to the React app changed URLs.

### Links

So you want to add links to other Markdown documents? Very good! Here's how you need to do it:
```md
Click [here](/campaigns/DND/notes/Locations/Baldurs%20Gate.md) to see other Note
```
> [!WARNING]
> Instead of spaces, you need to use URL-encoded version of a space - `%20`, so instead of `Baldurs Gate.md` use `Baldurs%20Gate.md`

---

### Demo

Currently I'm working on deploying the app, but cPanel ain't so straightforward. Soon you could use one of the following:

- [api.euklidesowo.pl](https://api.euklidesowo.pl) - backend of the app. I'm joking, you can't use it, it has strict CORS policy.
- [lorem.euklidesowo.pl](https://lorem.euklidesowo.pl) - frontend of the app and main entry point.

### Installation

Run `npm i` in each directory - `frontend` and `backend`, then run both servers with `npm start`

### Thanks to:

- <a href="https://www.freepik.com/icon/papyrus_1132419#fromView=search&page=1&position=87&uuid=59566003-6151-4f5d-a1a1-5f7f1e29288c">Icon by Freepik</a>
- Our AI overlords



