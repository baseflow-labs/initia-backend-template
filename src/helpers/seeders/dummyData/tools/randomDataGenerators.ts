interface DateProps {
    min?: string;
    max?: string;
}

const maleNames = ["x", "y", "z"];

const femaleNames = ["a", "b", "c"];

const lastNames = ["1", "2", "3"];

export const pickRandomItemFromList = (list: any[]) => {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
};

const genders = ["Male", "Female"];

export const generateGender = (): string => {
    return pickRandomItemFromList(genders);
};

const getRandomUniqueNames = (names: string[], count: number): string[] => {
    const shuffled = [...names].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const generateFullName = ({ gender }: { gender?: string }): string => {
    const finalGender = gender ?? generateGender();

    const [firstName] =
        finalGender === "Female"
            ? getRandomUniqueNames(femaleNames, 1)
            : getRandomUniqueNames(maleNames, 1);

    const [second, third] = getRandomUniqueNames(
        maleNames.filter((name) => name !== firstName),
        2
    );
    const [last] = getRandomUniqueNames(lastNames, 1);

    return `${firstName} ${second} ${third} ${last}`;
};

export const generateNationality = (): string => {
    return pickRandomItemFromList(["Jordan", "Palestine"]);
};

export const generateAddress = (): string => {
    return pickRandomItemFromList(["عمان", "القدس"]);
};

export const generateRandomNumberInRange = (min = 1, max = 9): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateBoolean = (): string => {
    return pickRandomItemFromList([true, false]);
};

export const generatePhoneNumber = (): string => {
    const second = pickRandomItemFromList(["7", "8", "9"]);

    return "7" + second + generateRandomNumber(7);
};

export const generateDate = ({ min, max }: DateProps): string => {
    const minDate = min ? new Date(min) : new Date("1950-01-01");
    const maxDate = max ? new Date(max) : new Date("2025-12-31");

    const minTime = minDate.getTime();
    const maxTime = maxDate.getTime();

    const randomTime =
        Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    const randomDate = new Date(randomTime);
    return randomDate.toISOString().split("T")[0];
};

export const generateTime = ({
    min = "00:00",
    max = "23:59",
}: {
    min?: string;
    max?: string;
} = {}): string => {
    const toMinutes = (time: string): number => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    };

    const fromMinutes = (minutes: number): string => {
        const h = Math.floor(minutes / 60)
            .toString()
            .padStart(2, "0");
        const m = (minutes % 60).toString().padStart(2, "0");
        return `${h}:${m}`;
    };

    const minMinutes = toMinutes(min);
    const maxMinutes = toMinutes(max);

    if (minMinutes > maxMinutes) {
        throw new Error(`'min' time cannot be later than 'max' time`);
    }

    const randomMinutes =
        Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;

    return fromMinutes(randomMinutes);
};

export const generateRandomNumber = (length: number): number => {
    if (length <= 0) throw new Error("Length must be greater than 0");

    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomLetter = (): string => {
    return pickRandomItemFromList([
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ]);
};

export const generateRandomLetters = (length: number): string => {
    if (length <= 0) throw new Error("Length must be greater than 0");

    let final = "";

    for (const i of Array(length).fill("")) {
        final += generateRandomLetter();
    }

    return final;
};
