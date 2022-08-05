interface HudHandle {

}

type HudType = "text";

interface MineTestPlayer {
    get_player_name() : string
    hud_change(handle : HudHandle, type : HudType, text : string) : void;
}

declare const player : MineTestPlayer;

type PlayerHook = (player : MineTestPlayer) => void;

interface MineTest {
    register_on_joinplayer(onJoin : PlayerHook) : void;
    register_on_leaveplayer(onLeave : PlayerHook) : void;
    request_insecure_environment() : void;
}

declare const minetest : MineTest;

interface WIELAHud {
    title : string;
}

let playerHuds : Record<string, WIELAHud> = {};

minetest.request_insecure_environment();

function onJoin(player : MineTestPlayer) {
    const name = player.get_player_name();

    const text = "Test text";
    const ids = playerHuds[name]
    if(ids != null) {
        player.hud_change(ids.title, "text", text);
    } else {
        playerHuds[name] = {
            title : "Previous"
        };
    }
}

function onLeave(player : MineTestPlayer) {
    delete playerHuds[player.get_player_name()];
}

minetest.register_on_joinplayer(onJoin);
minetest.register_on_leaveplayer(onLeave);