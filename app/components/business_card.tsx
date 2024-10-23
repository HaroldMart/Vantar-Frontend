import React from "react";

export default function Business_Card(business : string, products : Product[]) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg">
        <h2 className="text-2xl font-bold">{business}</h2>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid gap-4">
        {products.map((product) => {
            return  <div className="flex items-start gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{product.name}</h3>
            </div>
          </div>
        })}
        </div>
      </CardContent>
      {/* <CardFooter className="bg-muted p-6 rounded-b-lg">
        <Button className="w-full">Explore Products</Button>
      </CardFooter> */}
    </Card>
  );
}

export type Product = {
    id: number,
    name: string
}

// Card Component
function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${className}`}>{children}</div>;
}

function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${className}`}>{children}</div>;
}

function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${className}`}>{children}</div>;
}

// Button Component
function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 ${className}`}
    >
      {children}
    </button>
  );
}
