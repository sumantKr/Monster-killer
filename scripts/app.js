const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let battleLog = [];
let chosenMaxLife;
function getMaxLife() {
    chosenMaxLife = parseInt(prompt(`Maximum life`, `100`));
    if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
        throw {
            message: "Number chaie bhai!! Woh bhi positive",
        };
    }
    return chosenMaxLife;
}
try {
    chosenMaxLife = getMaxLife();
} catch (error) {
    console.log("baawde");
} finally {
    chosenMaxLife = 100;
}
adjustHealthBars(chosenMaxLife);

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

function attackMonster(mode) {
    let maxDamage;
    if (mode === "ATTACK") {
        maxDamage = ATTACK_VALUE;
    } else {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    currentMonsterHealth -= dealMonsterDamage(maxDamage);

    endRound();
}
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    currentPlayerHealth -= dealPlayerDamage(MONSTER_ATTACK_VALUE);
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        alert("BONUS USED.");
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You Won!!! 🥳");
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Try Again!!!");
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert("Draww!!!!");
        reset();
    }
}
function attackHandler() {
    attackMonster("ATTACK");
}
function strongAttackHandler() {
    attackMonster("STRONG_ATTACK");
}
function healPlayerHandler() {
    let healvalue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert(`Already At Maximum Health`);
        healvalue = chosenMaxLife - currentPlayerHealth;
    } else {
        healvalue = HEAL_VALUE;
    }
    increasePlayerHealth(healvalue);
    currentPlayerHealth += healvalue;
    currentPlayerHealth -= dealPlayerDamage(MONSTER_ATTACK_VALUE);

    endRound();
}
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function printLogHandler() {
    console.log(battleLog);
}
attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
