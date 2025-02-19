interface MessageProps {
  message: string;
}

export default function Message({ message }: MessageProps) {
  return (
    <li className="p-2 mb-1 bg-gray-200 rounded">
      {message}
    </li>
  );
}
