interface UsageData {
    count: number;
    resetTime: number;
}

let usage: { [key: string]: UsageData } = {};

export const rateLimiter = (req : any, res : any, next : any) => {
    const token = req.headers['authorization'] as string;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    if (!usage[token]) {
        usage[token] = { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 };
    }

    const { count, resetTime } = usage[token];

    if (Date.now() > resetTime) {
        usage[token] = { count: 0, resetTime: Date.now() + 24 * 60 * 60 * 1000 };
    }

    const wordCount = req.body.text.split(' ').length;

    if (count + wordCount >  80000) {
        return res.status(402).json({ message: 'Payment Required: Daily word limit exceeded' });
    }

    usage[token].count += wordCount;
    next();
};
