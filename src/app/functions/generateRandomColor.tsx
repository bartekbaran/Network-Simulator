export default function generateRandomColor(): string {
  return Math.random().toString(16).substr(-6);
}
