interface ContainerProps {
  children: React.ReactNode;
}

const MainContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      {/* Flex container to arrange children */}
      <div className="flex h-full lg:h-screen py-4">{children}</div>
    </div>
  );
};

export default MainContainer;
