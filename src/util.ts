export class SeeClientUtil {
	cutString: (text: string, size: number, dots?: boolean) => string;
	zeroFormat: (digits: number | string) => string;
	localeString: (number: number) => string;
	wait: (time: number) => any;
	constructor() {
		this.cutString = (text: string, size: number, dots = true): string =>
			text.length > size
				? `${text.slice(0, size)}${dots ? '...' : ''}`
				: text;
		this.zeroFormat = (digits: number | string): string => {
			const stringDigits = digits.toString();

			return stringDigits.length === 1
				? `0${stringDigits}`
				: stringDigits;
		};
		this.localeString = (number: number): string =>
			number.toLocaleString('en-US');

		this.wait = (time: number): Promise<void> =>
			new Promise((resolve) => setTimeout(resolve, time));
	}
}
