import { Instagram, ClipboardList } from "lucide-react";
import { Product } from "@/types/product";
import { OutboundLink } from "@/components/OutboundLink.component";

const INSTAGRAM_URL = "https://www.instagram.com/jiujitsu.unicamp/";

interface ProductActionsProps {
  product: Product;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const formsOpen = Boolean(product.formsLink);

  return (
    <div className="mt-6 md:mt-8">
      {formsOpen ? (
        <OutboundLink
          href={product.formsLink as string}
          trackLabel="product_order_form"
          trackPayload={{ productId: product.id, productTitle: product.title }}
          className="flex w-full transform items-center justify-center gap-3 rounded-xl bg-primary py-3 font-display text-sm uppercase tracking-wider text-white transition-all hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] md:py-4 md:text-base"
        >
          <ClipboardList size={20} />
          Fazer encomenda
        </OutboundLink>
      ) : (
        <OutboundLink
          href={INSTAGRAM_URL}
          trackLabel="product_instagram_contact"
          trackPayload={{ productId: product.id, productTitle: product.title }}
          className="flex w-full transform items-center justify-center gap-3 rounded-xl bg-zinc-700 py-3 font-display text-sm uppercase tracking-wider text-white transition-all hover:scale-[1.02] hover:bg-zinc-600 active:scale-[0.98] md:py-4 md:text-base"
        >
          <Instagram size={20} />
          Entrar em contato
        </OutboundLink>
      )}
      <p className="mt-3 px-4 text-center text-[10px] text-gray-500 md:text-xs">
        {formsOpen
          ? "Formulário com instruções de pagamento incluso."
          : "Solicite via Direct para participar do grupo de pedidos."}
      </p>
    </div>
  );
};
