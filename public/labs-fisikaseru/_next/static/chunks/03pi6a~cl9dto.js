(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,60013,e=>{"use strict";let t,n;var i=e.i(72400),r=e.i(51361),s=e.i(79513),a=e.i(91305),o=s,l=s;let c=new l.Box3,d=new l.Vector3;class u extends l.InstancedBufferGeometry{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new l.Float32BufferAttribute([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new l.Float32BufferAttribute([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new l.InstancedInterleavedBuffer(t,6,1);return this.setAttribute("instanceStart",new l.InterleavedBufferAttribute(n,3,0)),this.setAttribute("instanceEnd",new l.InterleavedBufferAttribute(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let i=new l.InstancedInterleavedBuffer(n,2*t,1);return this.setAttribute("instanceColorStart",new l.InterleavedBufferAttribute(i,t,0)),this.setAttribute("instanceColorEnd",new l.InterleavedBufferAttribute(i,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new l.WireframeGeometry(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new l.Box3);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),c.setFromBufferAttribute(t),this.boundingBox.union(c))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new l.Sphere),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,s=e.count;r<s;r++)d.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(d)),d.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(d));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var f=s,p=e.i(82088);let h=parseInt(s.REVISION.replace(/\D+/g,""));class m extends f.ShaderMaterial{constructor(e){super({type:"LineMaterial",uniforms:f.UniformsUtils.clone(f.UniformsUtils.merge([p.UniformsLib.common,p.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new f.Vector2(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${h>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let v=h>=125?"uv1":"uv2",y=new o.Vector4,x=new o.Vector3,g=new o.Vector3,S=new o.Vector4,w=new o.Vector4,b=new o.Vector4,E=new o.Vector3,A=new o.Matrix4,_=new o.Line3,M=new o.Vector3,L=new o.Box3,j=new o.Sphere,U=new o.Vector4;function C(e,t,i){return U.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),U.multiplyScalar(1/U.w),U.x=n/i.width,U.y=n/i.height,U.applyMatrix4(e.projectionMatrixInverse),U.multiplyScalar(1/U.w),Math.abs(Math.max(U.x,U.y))}class B extends o.Mesh{constructor(e=new u,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let e=0,r=0,s=t.count;e<s;e++,r+=2)x.fromBufferAttribute(t,e),g.fromBufferAttribute(n,e),i[r]=0===r?0:i[r-1],i[r+1]=i[r]+x.distanceTo(g);let r=new o.InstancedInterleavedBuffer(i,2,1);return e.setAttribute("instanceDistanceStart",new o.InterleavedBufferAttribute(r,1,0)),e.setAttribute("instanceDistanceEnd",new o.InterleavedBufferAttribute(r,1,1)),this}raycast(e,i){let r,s,a=this.material.worldUnits,l=e.camera;null!==l||a||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let c=void 0!==e.params.Line2&&e.params.Line2.threshold||0;t=e.ray;let d=this.matrixWorld,u=this.geometry,f=this.material;if(n=f.linewidth+c,null===u.boundingSphere&&u.computeBoundingSphere(),j.copy(u.boundingSphere).applyMatrix4(d),a)r=.5*n;else{let e=Math.max(l.near,j.distanceToPoint(t.origin));r=C(l,e,f.resolution)}if(j.radius+=r,!1!==t.intersectsSphere(j)){if(null===u.boundingBox&&u.computeBoundingBox(),L.copy(u.boundingBox).applyMatrix4(d),a)s=.5*n;else{let e=Math.max(l.near,L.distanceToPoint(t.origin));s=C(l,e,f.resolution)}L.expandByScalar(s),!1!==t.intersectsBox(L)&&(a?function(e,i){let r=e.matrixWorld,s=e.geometry,a=s.attributes.instanceStart,l=s.attributes.instanceEnd,c=Math.min(s.instanceCount,a.count);for(let s=0;s<c;s++){_.start.fromBufferAttribute(a,s),_.end.fromBufferAttribute(l,s),_.applyMatrix4(r);let c=new o.Vector3,d=new o.Vector3;t.distanceSqToSegment(_.start,_.end,d,c),d.distanceTo(c)<.5*n&&i.push({point:d,pointOnLine:c,distance:t.origin.distanceTo(d),object:e,face:null,faceIndex:s,uv:null,[v]:null})}}(this,i):function(e,i,r){let s=i.projectionMatrix,a=e.material.resolution,l=e.matrixWorld,c=e.geometry,d=c.attributes.instanceStart,u=c.attributes.instanceEnd,f=Math.min(c.instanceCount,d.count),p=-i.near;t.at(1,b),b.w=1,b.applyMatrix4(i.matrixWorldInverse),b.applyMatrix4(s),b.multiplyScalar(1/b.w),b.x*=a.x/2,b.y*=a.y/2,b.z=0,E.copy(b),A.multiplyMatrices(i.matrixWorldInverse,l);for(let i=0;i<f;i++){if(S.fromBufferAttribute(d,i),w.fromBufferAttribute(u,i),S.w=1,w.w=1,S.applyMatrix4(A),w.applyMatrix4(A),S.z>p&&w.z>p)continue;if(S.z>p){let e=S.z-w.z,t=(S.z-p)/e;S.lerp(w,t)}else if(w.z>p){let e=w.z-S.z,t=(w.z-p)/e;w.lerp(S,t)}S.applyMatrix4(s),w.applyMatrix4(s),S.multiplyScalar(1/S.w),w.multiplyScalar(1/w.w),S.x*=a.x/2,S.y*=a.y/2,w.x*=a.x/2,w.y*=a.y/2,_.start.copy(S),_.start.z=0,_.end.copy(w),_.end.z=0;let c=_.closestPointToPointParameter(E,!0);_.at(c,M);let f=o.MathUtils.lerp(S.z,w.z,c),h=f>=-1&&f<=1,m=E.distanceTo(M)<.5*n;if(h&&m){_.start.fromBufferAttribute(d,i),_.end.fromBufferAttribute(u,i),_.start.applyMatrix4(l),_.end.applyMatrix4(l);let n=new o.Vector3,s=new o.Vector3;t.distanceSqToSegment(_.start,_.end,s,n),r.push({point:s,pointOnLine:n,distance:t.origin.distanceTo(s),object:e,face:null,faceIndex:i,uv:null,[v]:null})}}}(this,l,i))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(y),this.material.uniforms.resolution.value.set(y.z,y.w))}}class z extends u{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,i=new Float32Array(2*n);if(3===t)for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5];else for(let r=0;r<n;r+=t)i[2*r]=e[r],i[2*r+1]=e[r+1],i[2*r+2]=e[r+2],i[2*r+3]=e[r+3],i[2*r+4]=e[r+4],i[2*r+5]=e[r+5],i[2*r+6]=e[r+6],i[2*r+7]=e[r+7];return super.setColors(i,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class D extends B{constructor(e=new z,t=new m({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let O=r.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:o,lineWidth:l,segments:c,dashed:d,...f},p){var h,v;let y=(0,a.useThree)(e=>e.size),x=r.useMemo(()=>c?new B:new D,[c]),[g]=r.useState(()=>new m),S=(null==n||null==(h=n[0])?void 0:h.length)===4?4:3,w=r.useMemo(()=>{let i=c?new u:new z,r=e.map(e=>{let t=Array.isArray(e);return e instanceof s.Vector3||e instanceof s.Vector4?[e.x,e.y,e.z]:e instanceof s.Vector2?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(i.setPositions(r.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof s.Color?e.toArray():e);i.setColors(e.flat(),S)}return i},[e,c,n,S]);return r.useLayoutEffect(()=>{x.computeLineDistances()},[e,x]),r.useLayoutEffect(()=>{d?g.defines.USE_DASH="":delete g.defines.USE_DASH,g.needsUpdate=!0},[d,g]),r.useEffect(()=>()=>{w.dispose(),g.dispose()},[w]),r.createElement("primitive",(0,i.default)({object:x,ref:p},f),r.createElement("primitive",{object:w,attach:"geometry"}),r.createElement("primitive",(0,i.default)({object:g,attach:"material",color:t,vertexColors:!!n,resolution:[y.width,y.height],linewidth:null!=(v=null!=o?o:l)?v:1,dashed:d,transparent:4===S},f)))});e.s(["Line",0,O],60013)},22700,e=>{"use strict";var t=e.i(61129),n=e.i(51361),i=e.i(79513),r=e.i(73942),s=e.i(60013),a=e.i(10974),o=e.i(24328);e.i(44006);var l=e.i(70774),c=e.i(86007),d=e.i(30792),u=e.i(94945),f=e.i(7225),p=e.i(59628),h=e.i(84807);let m=1/240,v=h.PARABOLA_CONFIG.constants,y=v.RESTITUSI,x=v.REDAMAN_HORIZONTAL,g=v.SPASI_PENANDA;function S(e){let t=Math.max(e.g>0?e.v0/e.g*Math.sqrt(e.v0*e.v0+2*e.g*Math.max(e.h0,0)):(0,f.theoreticalRange)(e.v0,f.OPTIMAL_ANGLE_DEG,e.g),2*e.h0+8,12),n=Math.min(1,26/t),i=g;for(;t/i>40;)i*=2;let r=[],s=5*i;for(let e=i;e<=1.05*t;e+=i)r.push({x:e,major:1e-6>Math.abs(e%s)});return{scale:n,extent:t,spacing:i,markers:r}}function w({getPoint:e,activeRef:s,seqRef:a,headColor:o,fadeToColor:l,maxPoints:c=480}){let{lineObject:d,geometry:u,positionAttribute:f}=(0,n.useMemo)(()=>{let e=new i.BufferGeometry,t=new Float32Array(3*c),n=new Float32Array(3*c),r=new i.Color(o),s=new i.Color(l);for(let e=0;e<c;e++){let t=s.clone().lerp(r,e/(c-1));n[3*e]=t.r,n[3*e+1]=t.g,n[3*e+2]=t.b}e.setAttribute("position",new i.BufferAttribute(t,3)),e.setAttribute("color",new i.BufferAttribute(n,3)),e.setDrawRange(0,0);let a=new i.LineBasicMaterial({vertexColors:!0,transparent:!0,opacity:.9}),d=new i.Line(e,a);return d.frustumCulled=!1,{lineObject:d,geometry:e,positionAttribute:e.getAttribute("position")}},[c,o,l]);(0,n.useEffect)(()=>()=>{u.dispose(),d.material.dispose()},[u,d]);let p=(0,n.useRef)([]),h=(0,n.useRef)(-1),m=(0,n.useMemo)(()=>new i.Vector3,[]);return(0,r.useFrame)(()=>{if(a.current!==h.current&&(h.current=a.current,p.current=[]),s.current){let t=e(m);p.current.push([t.x,t.y,t.z]),p.current.length>c&&p.current.shift()}let t=p.current.length;if(t>0){for(let e=0;e<t;e++){let t=p.current[e];f.setXYZ(e,t[0],t[1],t[2])}u.setDrawRange(0,t),f.needsUpdate=!0}else 0!==u.drawRange.count&&u.setDrawRange(0,0)}),(0,t.jsx)("primitive",{object:d})}function b({baseY:e,angleDeg:n,scale:i,accent:r}){let s=Math.max(.9,2.2*i),a=Math.max(.035,.09*i),o=n*p.DEG2RAD;return(0,t.jsxs)("group",{position:[0,e,0],children:[(0,t.jsxs)("mesh",{position:[0,-.14,0],castShadow:!0,children:[(0,t.jsx)("boxGeometry",{args:[4.5*a,.18,4.5*a]}),(0,t.jsx)("meshStandardMaterial",{color:"#475569",metalness:.55,roughness:.4})]}),(0,t.jsxs)("mesh",{rotation:[Math.PI/2,0,0],castShadow:!0,children:[(0,t.jsx)("cylinderGeometry",{args:[.7*a,.7*a,.16,12]}),(0,t.jsx)("meshStandardMaterial",{color:"#94a3b8",metalness:.7,roughness:.3})]}),(0,t.jsxs)("group",{rotation:[0,0,o],children:[(0,t.jsxs)("mesh",{position:[s/2,0,0],rotation:[0,0,-Math.PI/2],castShadow:!0,children:[(0,t.jsx)("cylinderGeometry",{args:[a,1.25*a,s,14]}),(0,t.jsx)("meshStandardMaterial",{color:r,metalness:.65,roughness:.35,emissive:r,emissiveIntensity:.08})]}),(0,t.jsxs)("mesh",{position:[s,0,0],rotation:[0,0,-Math.PI/2],children:[(0,t.jsx)("cylinderGeometry",{args:[1.35*a,1.35*a,.06*s,14]}),(0,t.jsx)("meshStandardMaterial",{color:"#334155",metalness:.7,roughness:.3})]})]})]})}function E({stateRef:e,scale:i,radius:s,glowColor:a}){let o=(0,n.useRef)(null);return(0,r.useFrame)(()=>{let t=e.current;o.current&&o.current.position.set(t.x*i,t.y*i+s,0)}),(0,t.jsxs)("group",{ref:o,children:[(0,t.jsxs)("mesh",{castShadow:!0,children:[(0,t.jsx)("sphereGeometry",{args:[s,32,24]}),(0,t.jsx)("meshStandardMaterial",{color:"#FDE047",emissive:a,emissiveIntensity:.85,metalness:.3,roughness:.35})]}),(0,t.jsxs)("mesh",{children:[(0,t.jsx)("sphereGeometry",{args:[1.9*s,16,12]}),(0,t.jsx)("meshBasicMaterial",{color:a,transparent:!0,opacity:.14,depthWrite:!1})]}),(0,t.jsx)("pointLight",{color:a,intensity:2.2,distance:Math.max(2.5,14*i)})]})}function A({stateRef:e,scale:i,radius:s}){let a=(0,n.useRef)(null),o=(0,n.useRef)(null),l=(0,n.useRef)(null);(0,r.useFrame)(()=>{let t=e.current,n=a.current;if(!n)return;let r=Math.hypot(t.vx,t.vy);if(n.visible=r>.4&&!t.rested,!n.visible)return;n.position.set(t.x*i,t.y*i+s,0),n.rotation.z=Math.atan2(t.vy,t.vx);let c=Math.min(.3+r*i*.18,3.2);o.current&&(o.current.scale.x=Math.max(c,.001),o.current.position.x=c/2),l.current&&(l.current.position.x=c)});let c=Math.max(.018,.05*i+.012);return(0,t.jsxs)("group",{ref:a,children:[(0,t.jsxs)("mesh",{ref:o,rotation:[0,0,-Math.PI/2],children:[(0,t.jsx)("cylinderGeometry",{args:[c,c,1,8]}),(0,t.jsx)("meshBasicMaterial",{color:"#22D3EE"})]}),(0,t.jsxs)("mesh",{ref:l,rotation:[0,0,-Math.PI/2],children:[(0,t.jsx)("coneGeometry",{args:[2.6*c,6*c,10]}),(0,t.jsx)("meshBasicMaterial",{color:"#22D3EE"})]})]})}function _({v0:e=25,angleDeg:i=30,g:r=9.81,h0:p=0,running:v,speed:g=1,resetKey:M=0,showControls:L=!1,background:j="dark",onStateChange:U,className:C}){let B=void 0===v,z="dark"===j,D=(0,n.useCallback)(()=>({v0:e,angleDeg:i,g:r,h0:p}),[e,i,r,p]),[O,R]=(0,n.useState)(()=>S(D())),P=(0,n.useRef)({x:0,y:p,t:0,vx:(0,f.velocityComponents)(e,i).vx,vy:(0,f.velocityComponents)(e,i).vy0,landed:!1,rested:!1,rangeX:null}),I=(0,n.useRef)(D()),T=(0,n.useRef)(0),G=(0,n.useRef)(U);(0,n.useEffect)(()=>{G.current=U},[U]);let{scale:N}=O,V=(0,n.useRef)(N);(0,n.useEffect)(()=>{V.current=N},[N]);let H=Math.max(.09,.3*N+.05),F=(0,n.useCallback)(()=>{let e=P.current;G.current?.({...e})},[]),k=(0,n.useCallback)(()=>{let e=D();I.current=e;let{vx:t,vy0:n}=(0,f.velocityComponents)(e.v0,e.angleDeg);P.current={x:0,y:e.h0,t:0,vx:t,vy:n,landed:!1,rested:!1,rangeX:null},T.current+=1,R(S(e)),F()},[D,F]),W=(0,n.useCallback)((e,t)=>{let n=P.current;if(n.rested)return;if(!n.landed){let i=I.current,r=(0,f.position)(i,t-e),s=(0,f.position)(i,t);if(s.y>0)n.t=s.t,n.x=s.x,n.y=s.y,n.vx=s.vx,n.vy=s.vy;else{let a=r.y-s.y,o=Math.max(t-e,0)+(a>1e-9?r.y/a:1)*e,l=(0,f.position)(i,o);n.t=o,n.x=l.x,n.y=0,n.vx=l.vx,n.vy=l.vy,n.rangeX=l.x,n.landed=!0,n.vy=-n.vy*y,n.vx=n.vx*x,n.vy<.35&&(n.vy=0,n.vx=0,n.rested=!0,F())}return}let i=I.current;n.t=t,n.vy-=i.g*e,n.x+=n.vx*e,n.y+=n.vy*e,n.y<=0&&n.vy<0&&(n.y=0,n.vy=-n.vy*y,n.vx*=x,n.vy<.35&&(n.vy=0,n.vx=0,n.rested=!0,F()))},[F]),q=(0,u.useSimClock)({timestep:m,running:v,speed:g,onStep:W,onReset:k}),{running:X,time:$,play:K,pause:Y,reset:Z,setSpeed:J}=q,Q=(0,n.useRef)(!1);(0,n.useEffect)(()=>{Q.current=X},[X]),(0,n.useEffect)(()=>{void 0!==v&&(v?K():Y())},[v,K,Y]),(0,n.useEffect)(()=>{J(g)},[g,J]);let ee=(0,n.useRef)(M);(0,n.useEffect)(()=>{M!==ee.current&&(ee.current=M,Z())},[M,Z]);let et=`${e}|${i}|${r}|${p}`,en=(0,n.useRef)(et);(0,n.useEffect)(()=>{en.current!==et&&(en.current=et,Z())},[et,Z]),(0,n.useEffect)(()=>{X&&F()},[$,X,F]);let ei=(0,n.useCallback)(e=>e.set(P.current.x*V.current,P.current.y*V.current,0),[]),er=(0,n.useMemo)(()=>{let e=D(),t=(0,f.timeOfFlight)(e),n=[];for(let i=0;i<=56;i++){let r=t*i/56,s=(0,f.position)(e,r);n.push([s.x*N,Math.max(s.y,0)*N,0])}return n},[D,N]),es=h.PARABOLA_CONFIG.meta.accentColor,ea=z?a.colors.bgDark:a.colors.bgLight,eo=O.extent*N*.35;return(0,t.jsxs)("div",{className:(0,o.cn)("relative h-full min-h-64 w-full overflow-hidden",C),children:[(0,t.jsxs)(c.PhysicsScene,{cameraPosition:[eo+9,6.5,13],cameraFov:45,background:j,fog:!1,showGrid:!0,showAxes:!1,shadows:!0,ariaLabel:"Simulasi 3D gerak parabola: bola ditembakkan dari meriam, terbang melengkung, memantul saat mendarat, dengan penggaris jarak dan penanda tinggi maksimum di medan latih",children:[(0,t.jsx)(l.OrbitControlsWrapper,{target:[eo,1.1,0],minDistance:2,maxDistance:60}),(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[eo,.001,0],receiveShadow:!0,children:[(0,t.jsx)("circleGeometry",{args:[Math.max(O.extent*N*1.15,6),48]}),(0,t.jsx)("meshStandardMaterial",{color:z?"#141f36":"#e6edf6",roughness:.95})]}),O.markers.map(e=>(0,t.jsxs)("mesh",{position:[e.x*N,e.major?.3:.16,0],castShadow:!1,children:[(0,t.jsx)("boxGeometry",{args:[Math.max(.015,.02*N+.008),e.major?.6:.32,Math.max(.015,.02*N+.008)]}),(0,t.jsx)("meshStandardMaterial",{color:e.major?a.colors.skyBlue:"#64748b",emissive:e.major?a.colors.skyBlue:"#000000",emissiveIntensity:.35*!!e.major})]},e.x)),q.running?null:(0,t.jsx)(s.Line,{points:er,color:z?a.colors.skyBlue:a.colors.accentCobalt,lineWidth:1,dashed:!0,dashSize:.12,gapSize:.1,transparent:!0,opacity:.4}),(0,t.jsx)(b,{baseY:p*N,angleDeg:i,scale:N,accent:es}),(0,t.jsx)(w,{getPoint:ei,activeRef:Q,seqRef:T,headColor:"#FDE047",fadeToColor:ea}),(0,t.jsx)(E,{stateRef:P,scale:N,radius:H,glowColor:es}),(0,t.jsx)(A,{stateRef:P,scale:N,radius:H})]}),L&&B?(0,t.jsx)(d.SimulationControls,{className:"absolute bottom-4 left-1/2 z-10 w-max max-w-[calc(100%-2rem)] -translate-x-1/2",running:q.running,onPlayPause:()=>q.running?q.pause():q.play(),onReset:q.reset,time:q.time,speed:q.speed,onSpeedChange:q.setSpeed}):null]})}e.s(["ProjectileScene3D",0,_,"default",0,_])},11597,e=>{e.n(e.i(22700))}]);