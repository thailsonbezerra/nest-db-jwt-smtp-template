export class PayloadDto {
  readonly userId: number;
  readonly userName: string;

  constructor(userId: number, userName: string) {
    this.userId = userId;
    this.userName = userName;
  }
}
