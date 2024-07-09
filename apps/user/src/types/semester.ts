export type Semester = 1 | 2;
export type Year = 2023 | 2024;

export class Term {
  private _year: number = 2024;
  private _semester: Semester = 1;

  constructor() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    this._year = currentYear;
    this._semester = currentMonth >= 2 && currentMonth <= 8 ? 1 : 2;
  }

  get year(): number {
    return this._year;
  }

  get semester(): number {
    return this._semester;
  }
}
