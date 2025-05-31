import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Instead of loading from files, include translations directly for tests
const resources = {
  en: {
    translation: {
      "spectrum": {
        "guessing": "Guessing...",
        "target": "Target"
      },
      "gamestate": {
        "left_brain": "LEFT BRAIN",
        "right_brain": "RIGHT BRAIN",
        "the_player": "THE PLAYER"
      },
      "jointeam": {
        "join_left": "Join",
        "join_right": "Join",
        "join_team": "Join a Team",
        "start_game": "Start Game"
      },
      "makeguess": {
        "players_clue": "{{givername}}'s clue",
        "waiting_guessing_team": "Waiting for {{guessingteam}} to guess...",
        "invite_other_players": "Invite other players to join the game.",
        "share_game_url": "Share this URL with them: {{game_url}}",
        "guess_for_team": "Submit Guess for {{teamname}}"
      },
      "viewscore": {
        "player_clue": "{{givername}}'s clue",
        "winning_team": "{{winnerteam}} wins!",
        "1_point_correct_guess": "1 point for their correct counter guess.",
        "2_point_exact_guess": "2 points for their exact counter guess!",
        "0_point_wrong_guess": "0 points for their counter guess.",
        "bonus_turn": "Your team earned a <strong>bonus turn!</strong>",
        "reset_game": "Reset game",
        "game_finished": "Game complete",
        "final_score_team": "Your team's final cooperative score",
        "points": "points",
        "catching_up": "Catchup activated: {{scoringteam}} takes a bonus turn!",
        "catching_up_info": "After a team scores a four-point round, they get a bonus turn if they are still behind the other team",
        "draw_next_card": "Draw next Spectrum Card",
        "score": "Score",
        "got": "gets",
        "tie_game": "It's a tie!",
        "right_on_target": "Right on target!",
        "one_away": "1 away from target",
        "two_away": "2 away from target"
      }
    },
    "spectrum-cards": {
      basic: [["left", "right"]],
      advanced: [["left", "right"]]
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    initImmediate: false,
    resources,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
  });

export default i18n;
