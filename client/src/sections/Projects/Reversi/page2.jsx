import style from './reversi.module.css';

function Page() {
   return (
      <div className={style.contentContainer}>
         <h1>Gameplay</h1>

         <p>
            Reversi is a strategy board game created in the late 1800s which was
            modified and re-marketed under the name Othello in the 1970s.
         </p>

         <div className={style.contentContainer__flexSection}>
            <div>
               <h2>The first four moves</h2>
               <p>
                  While a game of Othello starts with an initial four pieces
                  placed, Reversi starts with an empty board. However, the first
                  four moves must still be in the center four squares. A coin is
                  flipped to determine which player goes first.
               </p>
            </div>
            <img
               alt="initial placement"
               src={require('assets/img/reversi_rules_1.webp')}
               width="185px"
               height="185px"
            />
         </div>

         <div className={style.contentContainer__flexSection}>
            <div>
               <h2>Legal Moves</h2>
               <p>
                  After the four initial moves, a legal move is one which flips
                  an opponent&apos;s pieces. A piece is flipped if placing the
                  piece surrounds an enemy piece with your colors.
               </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <img
                  alt="taking a piece"
                  src={require('assets/img/reversi_rules_2.webp')}
                  width="185px"
                  height="185px"
               />
               <img
                  alt="taking a piece"
                  src={require('assets/img/reversi_rules_3.webp')}
                  width="185px"
                  height="185px"
               />
            </div>
         </div>

         <div className={style.contentContainer__flexSection}>
            <div style={{ maxWidth: 'none' }}>
               <h2>Game Over</h2>
               <p>
                  The game ends when neither player has a legal move. This
                  occurs either when the game board has filled up, or no move
                  will flip either player&apos;s pieces. The winner is the
                  player with the most pieces once the game has ended.
               </p>
            </div>
         </div>
      </div>
   );
}

export default Page;
