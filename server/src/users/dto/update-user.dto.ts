export class UpdateUserStatusDto {
  readonly status: boolean;
  readonly userId: number;
  readonly socketId?: string;
}
