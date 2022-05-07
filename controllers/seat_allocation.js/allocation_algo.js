'use strict';
import Queue from './allocation_queue';

var size = 505;
var Ranking = Array(size).fill( Array(size).fill("0") );
var InstitutePref = Array(size).fill( Array(size).fill("0") );
var Next = Array(size).fill( Array(size).fill("0") );
var Current = Array(size).fill( Array(size).fill("0") );


const allocate = () => {
    
    var N, i, j, m, w;
    N=505;
    let q = new Queue();
    for (i = 1; i <= N; i++)
        for (j = 1; j <= N; j++)
            Ranking[i][InstitutePref[i][j]] = j;
    for (i = 1; i <= N; i++){
        freeCandidate.enqueue(i);
        Next[i] = 1;
    }
    while (!freeCandidate.isEmpty())    {
        m = freeCandidate.peek();
        w = ManPref[m][Next[m]++];
        if (Current[w] == 0)   {
            Current[w] = m;
            freeCandidate.dequeue();
        }
        else if (Ranking[w][m] < Ranking[w][Current[w]])  {
            freeCandidate.dequeue();
            freeCandidate.enqueue(Current[w]);
            Current[w] = m;
        }
    }
    // (m, w) pairs in the stable matching
    for (w = 1; w <= N; w++)
        console.log(Current[w]+" "+w);

    return 0;
}