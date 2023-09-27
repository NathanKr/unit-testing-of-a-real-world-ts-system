export function add(n1 : number , n2 : number) : number{
    return n1+n2;
}

export function mul(n1 : number , n2 : number) : number{
    return n1*n2;
}

export function calculateAverage(grades: number[]): number {
    const sum = grades.reduce((acc, grade) => acc + grade, 0);

    const avg = sum / grades.length;

   
    return avg;
}
