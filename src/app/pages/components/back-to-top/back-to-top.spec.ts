import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToTopComponent } from './back-to-top';

describe('BackToTopComponent', () => {
  let component: BackToTopComponent;
  let fixture: ComponentFixture<BackToTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackToTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render button when not visible', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeNull();
  });

  it('should show button after scrolling down', () => {
    component.onScroll();
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeNull();

    window.scrollY = 600;
    component.onScroll();
    fixture.detectChanges();

    const visibleButton = fixture.nativeElement.querySelector('button');
    expect(visibleButton).not.toBeNull();
  });

  it('should scroll to top and update image when clicked', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

    component.visible.set(true);
    fixture.detectChanges();

    const oldImage = component.pokemonImage;
    const button: HTMLButtonElement | null = fixture.nativeElement.querySelector('button');
    expect(button).not.toBeNull();

    button!.click();
    fixture.detectChanges();

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    expect(component.pokemonImage).not.toBe(oldImage);
    expect(component.randomPokemonId).toBeGreaterThanOrEqual(1);
    expect(component.randomPokemonId).toBeLessThanOrEqual(151);

    scrollToSpy.mockRestore();
  });
});
