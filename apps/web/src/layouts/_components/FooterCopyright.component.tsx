export const FooterCopyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 text-center text-xs text-gray-600">
      &copy; {currentYear} Equipe de Jiu-Jitsu da Unicamp. Todos os direitos
      reservados.
    </div>
  );
};
