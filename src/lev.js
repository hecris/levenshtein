// interactive dp matrix
// playback steps
export function lev(S, T) {
    var n = S.length;
    var m = T.length;
    var dp = new Array(n+1);
    for (let i = 0; i <= n; ++i) {
        dp[i] = new Array(m+1)
    }
    lev_helper(S, T, n, m, dp);
    return dp;
}


function lev_helper(S, T, n, m, dp) {
    for (let i = 0; i <= n; ++i) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= m; ++j) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= n; ++i) {
        for (let j = 1; j <= m; ++j) {
            if (S[i-1] === T[j-1]) {
                dp[i][j] = dp[i-1][j-1]; // NON
            }
            else {
                dp[i][j] = 1 + Math.min(
                        dp[i-1][j-1], // SUB
                        dp[i-1][j], // DEL, UP
                        dp[i][j-1] // INS, LEFT
                        );
            }
        }
    }
}

export class PlaybackIterator {
    constructor(S, T, dp, i, j) {
        this.S = S;
        this.T = T;
        this.dp = dp;
        this.i = i;
        this.j = j;
        this.hasNext = true;
    }

    next() {
        let i = this.i, j = this.j, dp = this.dp;

        if (!this.hasNext || (i === 0 && j === 0)) {
            this.hasNext = false;
            return 'FIN';
        }

        var action;
        var mymin = () => Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]);

        if (this.S[i-1] === this.T[j-1]) {
            --i;
            --j;
            action = 'NON';
        }

        else if (i === 0 || mymin() === dp[i][j-1]) {
            --j;
            action = 'INS';
        }
        else if (j === 0 || mymin() === dp[i-1][j]) {
            --i;
            action = 'DEL';
        }
        else {
            --i;
            --j;
            action = 'SUB';
        }
        this.i = i;
        this.j = j;
        return action;

    }
}
