export async function getCurrentUser() {
  let { data, error } = await supabase
    .from("profiles")
    .select(`username, ethercoin, avatars(path)`)
    .eq("id", user.id)
    .single();

  if (error) {
    console.warn(error);
  } else if (data) {
    //! TITLE
    //! SHOWCASE ITEMS
    //! SHOWCASE BADGES
    setUsername(data.username);
    setAvatarUrl(data.avatars.path);
    setEthercoin(data.ethercoin);
    console.log(data);
  }
}
