import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

class DarkBoostMenu extends PolyMod {
    init() {
        // This creates the menu UI. The toggles are a visual prototype:
        // actual speed/jump changes require compatible game-physics hooks.
        const addMenu = () => {
            if (document.getElementById("dark-boost-menu")) return;

            const style = document.createElement("style");
            style.id = "dark-boost-menu-style";
            style.textContent = `
              #dark-boost-menu { position:fixed; top:18px; right:18px; z-index:999999;
                width:260px; color:#f2f5f7; background:#10151c; border:1px solid #42ff86;
                border-radius:14px; box-shadow:0 8px 28px #0009; font:14px/1.4 system-ui,sans-serif;
                overflow:hidden; }
              #dark-boost-menu * { box-sizing:border-box; }
              #dark-boost-menu header { background:#18232a; padding:12px 14px; display:flex;
                justify-content:space-between; align-items:center; font-weight:800; letter-spacing:1px; }
              #dark-boost-menu .body { padding:12px; }
              #dark-boost-menu .toggle { display:flex; align-items:center; justify-content:space-between;
                padding:10px; margin:8px 0; background:#1b232d; border-radius:9px; }
              #dark-boost-menu button { cursor:pointer; border:1px solid #42ff86; color:#42ff86;
                background:#0c1116; border-radius:8px; padding:6px 10px; font-weight:700; }
              #dark-boost-menu button.active { color:#08120b; background:#42ff86; }
              #dark-boost-menu .note { color:#aab6c2; font-size:11px; margin-top:10px; }
              #dark-boost-menu .close { border:0; font-size:18px; padding:0 5px; }
            `;
            document.head.appendChild(style);

            const panel = document.createElement("section");
            panel.id = "dark-boost-menu";
            panel.innerHTML = `
              <header><span>POLYTRACK // BOOST</span><button class="close" aria-label="Hide menu">×</button></header>
              <div class="body">
                <div class="toggle"><span>⚡ Speed boost</span><button data-feature="speed">OFF</button></div>
                <div class="toggle"><span>🚀 Jump boost</span><button data-feature="jump">OFF</button></div>
                <div class="note">Menu prototype: toggles currently change their display only. Game physics hooks are not yet connected.</div>
              </div>`;
            document.body.appendChild(panel);

            panel.querySelector(".close").addEventListener("click", () => {
                panel.remove();
                let opener = document.getElementById("dark-boost-menu-opener");
                if (!opener) {
                    opener = document.createElement("button");
                    opener.id = "dark-boost-menu-opener";
                    opener.textContent = "BOOST MENU";
                    opener.style.cssText = "position:fixed;right:18px;top:18px;z-index:999999;background:#10151c;color:#42ff86;border:1px solid #42ff86;border-radius:9px;padding:10px;font-weight:800;cursor:pointer";
                    opener.addEventListener("click", () => { opener.remove(); addMenu(); });
                    document.body.appendChild(opener);
                }
            });
            panel.querySelectorAll("[data-feature]").forEach(button => {
                button.addEventListener("click", () => {
                    const active = button.classList.toggle("active");
                    button.textContent = active ? "ON" : "OFF";
                });
            });
        };
        addMenu();
    }
}
export let polyMod = new DarkBoostMenu();
