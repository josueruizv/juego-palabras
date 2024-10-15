const words: string[] = [
    'COMPUTADORA',
    'AGUACATE',
    'PAPAYA',
    'VEHICULO',
    'ANIMAL',
    'VETERINARIO',
    'CELULAR',
    'TELEFONO'
]

export function getRandomWord() {
    
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log( randomIndex );
    

    return words[randomIndex];
}