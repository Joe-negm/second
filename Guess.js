const Next = document.querySelector('.next');
const Start = document.querySelector('.start');
const EnterWordsBtn = document.querySelector('.Enter');
const answersContainer = document.querySelector('.answers-container');
const answerBtns = document.querySelectorAll('.answer');
const Input = document.querySelector('.Enter-Word');
const Submit = document.querySelector('.submit');
const WinMessage = document.querySelector('.Win');
const LoseMessage = document.querySelector('.lose');
const currentCount = document.getElementById('current-count');
const totalCount = document.getElementById('total-count');

let currentIndex = 0;
let originalWord = "";
let hiddenLetter = "";
let customWords = [];

let randomList = [
    'dreikanter:three-faced pebble worn by wind',
    'callant:boy; fellow',
    'cladoptosis:annual shedding of twigs and branches',
    'chuckwalla:herbivorous desert-dwelling lizard',
    'hydrokinetics:study of motion of fluids',
    'volage:giddy; flighty; fickle',
    'keelhaul:to punish by dragging under keel of ship',
    'vesper:evening; the evening star',
    "mariticide:killing or killer of one's husband",
    'truncheon:broken spear; broken or cut piece',
    'copromania:obsession with feces',
    'sporicide:killing of spores',
    'appointé:in heraldry, having two things touching at the ends',
    'placentiform:cake-shaped',
    'pseudolalia:incoherence of speech',
    'taffrail:rail round the stern of a ship',
    'brochette:skewer for holding food steady while cooking',
    'eucrasy:state of fitness and physical well-being',
    'manducate:to chew or eat',
    'pibcorn:old Welsh instrument like a hornpipe',
    'quod:prison',
    'tomentose:bearing thickly matted hair or fur',
    'anemology:study of winds',
    'snath:curved handle or shaft of a scythe',
    "cassock:close-fitting ankle-length clergyman's garment",
    'vedro:Russian unit of liquid measure equal to 2.7 gallons',
    'capriform:goatlike',
    'associative:indicating association with or accompaniment by',
    'portière:curtain hung over door of a room',
    'sine:without',
    'caparison:armour for a horse',
    'galanty:shadow play',
    'molluscicide:killing of mollusks',
    'sortilege:divination by drawing lots',
    'aucupate:to hunt birds; to pursue prey with vigilance',
    'purificator:cloth used to wipe Eucharist chalice',
    'canities:whiteness of the hair',
    'ergotise:to wrangle',
    'epenthesis:insertion of extra sound into a word',
    'ethnography:written description of societies and cultures',
    'scaphism:execution by deserting honey-covered person in the sun',
    'paillette:a spangle',
    'wurst:large sausage',
    'lutestring:plain glossy silk',
    'icteroid:resembling jaundice',
    'fascine:bundle of brushwood used to fill ditches',
    'cataphysical:unnatural',
    'iulan:of the first growth of the beard',
    'phanopoeia:visual imagery in poetry',
    'zari:Indian gold and silver brocade',
];

// Function to show the answer buttons
function showAnswerButtons() {
    const answerButtons = document.querySelectorAll('.answer');
    answerButtons.forEach(button => {
        button.style.display = 'flex';
        button.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter
        button.style.backgroundColor = '#3B8686';
        button.style.pointerEvents = 'auto';
    });
    
    // Set one of the buttons to the correct letter
    const correctIndex = Math.floor(Math.random() * answerButtons.length);
    answerButtons[correctIndex].textContent = hiddenLetter;
    answerButtons[correctIndex].dataset.correct = "true";
}

Start.addEventListener('click', () => {
    document.querySelector('.Explain').style.display = 'none';
    document.querySelector('.Enterance').style.display = 'none';
    answersContainer.style.margin = '20px 0'; 
    Next.style.display = 'inline';
    WinMessage.style.display = 'none';
    LoseMessage.style.display = 'none';
    
    // Combine default words with custom words
    const allWords = [...randomList, ...customWords];
    totalCount.textContent = allWords.length;
    currentCount.textContent = currentIndex + 1;

    originalWord = allWords[0];
    // Find a letter to hide (only letters, not spaces or punctuation)
    const letters = originalWord.match(/[a-zA-Z]/g);
    if (letters && letters.length > 0) {
        hiddenLetter = letters[Math.floor(Math.random() * letters.length)];
    } else {
        hiddenLetter = 'a'; // Fallback
    }
    
    // Initialize display with first word
    document.getElementById('word-display').textContent = 
        originalWord.replace(new RegExp(hiddenLetter, 'gi'), '-');
    
    showAnswerButtons();
});

Next.addEventListener('click', () => {
    const display = document.getElementById('word-display');
    WinMessage.style.display = 'none';
    LoseMessage.style.display = 'none';
    
    // Combine default words with custom words
    const allWords = [...randomList, ...customWords];
    totalCount.textContent = allWords.length;
    currentCount.textContent = currentIndex + 1;

    if (currentIndex < allWords.length) {
        originalWord = allWords[currentIndex];
        // Find a letter to hide
        const letters = originalWord.match(/[a-zA-Z]/g);
        if (letters && letters.length > 0) {
            hiddenLetter = letters[Math.floor(Math.random() * letters.length)];
        } else {
            hiddenLetter = 'a'; // Fallback
        }
        
        // Update display with next word
        display.textContent = originalWord.replace(new RegExp(hiddenLetter, 'gi'), '-');
        currentIndex++;
        
        showAnswerButtons();

        // Add animation effect
        display.style.opacity = '0';
        setTimeout(() => {
            display.style.opacity = '1';
        }, 300);
    } else {
        // Handle end of list
        display.textContent = "🎉 You've completed all words!";
        display.style.color = '#00c8c8';
        Next.style.display = 'none';
        
        // Hide answer buttons
        const answerButtons = document.querySelectorAll('.answer');
        answerButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
});

// Add click event to answer buttons
answersContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('answer')) {
        const button = e.target;
        const isCorrect = button.dataset.correct === "true";
        
        if (isCorrect) {
            // Reveal the letter in the word
            const display = document.getElementById('word-display');
            display.textContent = originalWord;
            button.style.backgroundColor = '#4CAF50';
            WinMessage.style.display = 'block';
            
            // Disable all buttons
            const answerButtons = document.querySelectorAll('.answer');
            answerButtons.forEach(btn => {
                btn.style.pointerEvents = 'none';
            });
        } else {
            button.style.backgroundColor = '#f44336';
            LoseMessage.style.display = 'block';
        }
    }
});

EnterWordsBtn.addEventListener('click', () => {
    document.querySelector('.Enter').style.display = 'none';
    document.querySelector('.start').style.display = 'flex';
    document.querySelector('.write').style.display = 'flex';
    WinMessage.style.display = 'none';
    LoseMessage.style.display = 'none';
    randomList = customWords;
});

Submit.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (Input.value.trim() !== "") {
        // Add the word to customWords array
        customWords.push(Input.value.trim());
        
        // Clear the input
        Input.value = "";
        
        // Show success message
        alert(`Word added! Total custom words: ${customWords.length}`);
    }});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (Input.value.trim() !== "") {
                // Add the word to customWords array
                customWords.push(Input.value.trim());
                
                // Clear the input
                Input.value = "";
                
                // Show success message
                alert(`Word added! Total custom words: ${customWords.length}`);
            }
        }});