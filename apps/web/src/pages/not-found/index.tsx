import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { NotFoundState } from "@/components/states";
import { Button } from "@/components/ui/button";

export const NotFound = () => {
  return (
    <div className="container flex min-h-[calc(100vh-160px)] items-center justify-center">
      <NotFoundState
        className="min-h-0 [&_[data-slot=empty-description]]:text-base [&_[data-slot=empty-header]]:max-w-md [&_[data-slot=empty-title]]:text-3xl"
        icon={null}
        code={
          <span className="font-display text-8xl font-bold text-primary-text">
            404
          </span>
        }
        title="Página não encontrada"
        description="A página que você está procurando não existe ou foi movida."
        action={
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-auto gap-2 px-6 py-3 tracking-wide"
              nativeButton={false}
              render={<Link to="/" />}
            >
              <Home className="size-[18px]" />
              Ir para o início
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-auto gap-2 border-white/20 bg-transparent px-6 py-3 tracking-wide text-foreground hover:border-white/40 hover:bg-transparent dark:border-white/20 dark:bg-transparent dark:hover:border-white/40 dark:hover:bg-transparent"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="size-[18px]" />
              Voltar
            </Button>
          </div>
        }
      />
    </div>
  );
};
