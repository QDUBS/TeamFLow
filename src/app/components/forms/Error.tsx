type Props = {
  message: string | undefined;
};

export default function Error({ message }: Props) {
  return <div className="text-red-600 text-sm">{message}</div>;
}
