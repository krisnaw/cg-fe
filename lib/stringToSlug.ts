export  function nameToSlug(name: string) : string {
   return name.toLowerCase().replace(/ /g, '-');
}
