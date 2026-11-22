import { ClipboardList } from "lucide-react";
import { InstagramIcon } from "@/components/InstagramIcon.component";
import { Product } from "@/types/product";
import { OutboundLink } from "@/components/OutboundLink.component";
import { Button } from "@/components/ui/button";

const INSTAGRAM_URL = "https://www.instagram.com/jiujitsu.unicamp/";

interface ProductActionsProps {
  product: Product;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const formsOpen = Boolean(product.formsLink);

  return (
    <div className="mt-6 md:mt-8">
      {formsOpen ? (
        <Button
          size="lg"
          className="h-auto w-full transform gap-3 rounded-xl py-3 text-sm tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] md:py-4 md:text-base"
          nativeButton={false}
          render={
            <OutboundLink
              href={product.formsLink as string}
              trackLabel="product_order_form"
              trackPayload={{
                productId: product.id,
                productTitle: product.title,
              }}
            />
          }
        >
          <ClipboardList className="size-5" />
          Fazer encomenda
        </Button>
      ) : (
        <Button
          variant="secondary"
          size="lg"
          className="h-auto w-full transform gap-3 rounded-xl bg-zinc-700 py-3 text-sm tracking-wider text-white transition-all hover:scale-[1.02] hover:bg-zinc-600 active:scale-[0.98] md:py-4 md:text-base"
          nativeButton={false}
          render={
            <OutboundLink
              href={INSTAGRAM_URL}
              trackLabel="product_instagram_contact"
              trackPayload={{
                productId: product.id,
                productTitle: product.title,
              }}
            />
          }
        >
          <InstagramIcon className="size-5" />
          Entrar em contato
        </Button>
      )}
      <p className="mt-3 px-4 text-center text-[10px] text-gray-500 md:text-xs">
        {formsOpen
          ? "Formulário com instruções de pagamento incluso."
          : "Solicite via Direct para participar do grupo de pedidos."}
      </p>
    </div>
  );
};
