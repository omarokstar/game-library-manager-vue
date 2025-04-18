<template>
  <div class="genre-list">
    <!-- الأبجدية (# و A-Z) -->
    <div class="alphabet">
      <span>#</span>
      <span
        v-for="letter in alphabet"
        :key="letter"
        :class="{ highlighted: sections.includes(letter) }"
        @click="scrollToSection(letter)"
      >
        {{ letter }}
      </span>
    </div>

    <!-- قسم A -->
    <h2 id="A">A</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Adventure</span><router-link :to="{ name: 'AllGames', query: { genre: 'Adventure' } }" class="arrow">▶</router-link></li>
          <li><span>Arcade</span><router-link :to="{ name: 'AllGames', query: { genre: 'Arcade' } }" class="arrow">▶</router-link></li>
          <li><span>Audio Production</span><router-link :to="{ name: 'AllGames', query: { genre: 'Audio Production' } }" class="arrow">▶</router-link></li>
          <li><span>Action</span><router-link :to="{ name: 'AllGames', query: { genre: 'Action' } }" class="arrow">▶</router-link></li>
          <li><span>Animation & Modeling</span><router-link :to="{ name: 'AllGames', query: { genre: 'Animation & Modeling' } }" class="arrow">▶</router-link></li>
          <li><span>Accounting</span><router-link :to="{ name: 'AllGames', query: { genre: 'Accounting' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم C -->
    <h2 id="C">C</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Card & Board Game</span><router-link :to="{ name: 'AllGames', query: { genre: 'Card & Board Game' } }" class="arrow">▶</router-link></li>
          <li><span>Casual</span><router-link :to="{ name: 'AllGames', query: { genre: 'Casual' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم D -->
    <h2 id="D">D</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Design & Illustration</span><router-link :to="{ name: 'AllGames', query: { genre: 'Design & Illustration' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم E -->
    <h2 id="E">E</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Early Access</span><router-link :to="{ name: 'AllGames', query: { genre: 'Early Access' } }" class="arrow">▶</router-link></li>
          <li><span>Education</span><router-link :to="{ name: 'AllGames', query: { genre: 'Education' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم F -->
    <h2 id="F">F</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Fighting</span><router-link :to="{ name: 'AllGames', query: { genre: 'Fighting' } }" class="arrow">▶</router-link></li>
          <li><span>Free to Play</span><router-link :to="{ name: 'AllGames', query: { genre: 'Free to Play' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم G -->
    <h2 id="G">G</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Gore</span><router-link :to="{ name: 'AllGames', query: { genre: 'Gore' } }" class="arrow">▶</router-link></li>
          <li><span>Game Development</span><router-link :to="{ name: 'AllGames', query: { genre: 'Game Development' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم H -->
    <h2 id="H">H</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Hack and Slash/Beat 'em up</span><router-link :to="{ name: 'AllGames', query: { genre: 'Hack and Slash/Beat \'em up' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم I -->
    <h2 id="I">I</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Indie</span><router-link :to="{ name: 'AllGames', query: { genre: 'Indie' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم M -->
    <h2 id="M">M</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Music</span><router-link :to="{ name: 'AllGames', query: { genre: 'Music' } }" class="arrow">▶</router-link></li>
          <li><span>Moba</span><router-link :to="{ name: 'AllGames', query: { genre: 'Moba' } }" class="arrow">▶</router-link></li>
          <li><span>Massively Multiplayer</span><router-link :to="{ name: 'AllGames', query: { genre: 'Massively Multiplayer' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم N -->
    <h2 id="N">N</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Nudity</span><router-link :to="{ name: 'AllGames', query: { genre: 'Nudity' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم P -->
    <h2 id="P">P</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Point-and-click</span><router-link :to="{ name: 'AllGames', query: { genre: 'Point-and-click' } }" class="arrow">▶</router-link></li>
          <li><span>Platformer</span><router-link :to="{ name: 'AllGames', query: { genre: 'Platformer' } }" class="arrow">▶</router-link></li>
          <li><span>Puzzle</span><router-link :to="{ name: 'AllGames', query: { genre: 'Puzzle' } }" class="arrow">▶</router-link></li>
          <li><span>Photo Editing</span><router-link :to="{ name: 'AllGames', query: { genre: 'Photo Editing' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم Q -->
    <h2 id="Q">Q</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Quiz/Trivia</span><router-link :to="{ name: 'AllGames', query: { genre: 'Quiz/Trivia' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم R -->
    <h2 id="R">R</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Racing</span><router-link :to="{ name: 'AllGames', query: { genre: 'Racing' } }" class="arrow">▶</router-link></li>
          <li><span>Real Time Strategy (RTS)</span><router-link :to="{ name: 'AllGames', query: { genre: 'Real Time Strategy (RTS)' } }" class="arrow">▶</router-link></li>
          <li><span>Role playing (RPG)</span><router-link :to="{ name: 'AllGames', query: { genre: 'Role playing (RPG)' } }" class="arrow">▶</router-link></li>
          <li><span>RPG</span><router-link :to="{ name: 'AllGames', query: { genre: 'RPG' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم S -->
    <h2 id="S">S</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Shooter</span><router-link :to="{ name: 'AllGames', query: { genre: 'Shooter' } }" class="arrow">▶</router-link></li>
          <li><span>Simulator</span><router-link :to="{ name: 'AllGames', query: { genre: 'Simulator' } }" class="arrow">▶</router-link></li>
          <li><span>Sport</span><router-link :to="{ name: 'AllGames', query: { genre: 'Sport' } }" class="arrow">▶</router-link></li>
          <li><span>Strategy</span><router-link :to="{ name: 'AllGames', query: { genre: 'Strategy' } }" class="arrow">▶</router-link></li>
          <li><span>Simulation</span><router-link :to="{ name: 'AllGames', query: { genre: 'Simulation' } }" class="arrow">▶</router-link></li>
          <li><span>Sports</span><router-link :to="{ name: 'AllGames', query: { genre: 'Sports' } }" class="arrow">▶</router-link></li>
          <li><span>Software Training</span><router-link :to="{ name: 'AllGames', query: { genre: 'Software Training' } }" class="arrow">▶</router-link></li>
          <li><span>Sexual Content</span><router-link :to="{ name: 'AllGames', query: { genre: 'Sexual Content' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم T -->
    <h2 id="T">T</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Turn-based strategy (TBS)</span><router-link :to="{ name: 'AllGames', query: { genre: 'Turn-based strategy (TBS)' } }" class="arrow">▶</router-link></li>
          <li><span>Tactical</span><router-link :to="{ name: 'AllGames', query: { genre: 'Tactical' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم U -->
    <h2 id="U">U</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Utilities</span><router-link :to="{ name: 'AllGames', query: { genre: 'Utilities' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم V -->
    <h2 id="V">V</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Visual Novel</span><router-link :to="{ name: 'AllGames', query: { genre: 'Visual Novel' } }" class="arrow">▶</router-link></li>
          <li><span>Video Production</span><router-link :to="{ name: 'AllGames', query: { genre: 'Video Production' } }" class="arrow">▶</router-link></li>
          <li><span>Violent</span><router-link :to="{ name: 'AllGames', query: { genre: 'Violent' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>

    <!-- قسم W -->
    <h2 id="W">W</h2>
    <div class="genre-section-wrapper">
      <div class="genre-section">
        <ul>
          <li><span>Web Publishing</span><router-link :to="{ name: 'AllGames', query: { genre: 'Web Publishing' } }" class="arrow">▶</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alphabet: [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
      ],
      sections: ["A", "C", "D", "E", "F", "G", "H", "I", "M", "N", "P", "Q", "R", "S", "T", "U", "V", "W"]
    };
  },
  methods: {
    scrollToSection(letter) {
      if (this.sections.includes(letter)) {
        const section = document.getElementById(letter);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }
};
</script>

<style scoped>
.genre-list {
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  overflow-y: auto !important;
  padding-bottom: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.genre-list::-webkit-scrollbar {
  display: none;
}

.genre-list {
  display: flex;
  flex-direction: column;
}

.alphabet {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;
  padding: 10px;
  background-color: transparent;
}

.alphabet span {
  cursor: pointer;
  padding: 5px 10px;
  font-size: 14px;
  color: #666;
  background: none;
  border-radius: 0;
  min-width: 20px;
  text-align: center;
}

.alphabet span:not(.highlighted) {
  cursor: default;
}

.alphabet span.highlighted {
  color: #fff;
  text-shadow: 0 0 5px #ffaa00, 0 0 10px #ffaa00;
}

.alphabet span:hover {
  color: #999;
}

.genre-section-wrapper {
  position: relative;
  margin-bottom: 15px;
}

.genre-section-wrapper h2 {
  font-size: 24px;
  color: #d2d2d2;
  position: absolute;
  top: -30px;
  left: -40px;
}

.genre-section {
  background-color:rgba(255, 255, 255, 0.1);
  ;
  padding: 15px;
  border-radius: 5px;
}

.genre-section ul {
  list-style: none;
  padding: 0;
}

.genre-section li {
  padding: 10px 0;
  border-bottom: 1px solid #32323e;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #d2d2d2;
}

.genre-section li:last-child {
  border-bottom: none;
}

.genre-section li .arrow {
  font-size: 12px;
  color: #d2d2d2;
  text-decoration: none;
}
</style>