<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep StudyPilot demo data and transient state in a shared frontend provider, separate from page views, so future authenticated services can replace it without changing UI structure.
- Use one TanStack file route per navigation destination and a shared shell at the root; every content route owns its social metadata.
- Keep AI and notification controls explicitly unavailable until real services exist; frontend interactions do not imply persistent storage.
